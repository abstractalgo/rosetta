const { readdir, writeFile } = require('fs/promises');
const path = require('path');

const generageRosettaStructure = async () => {
  const structure = {};

  // ! THIS IS VERY SENSITIVE !
  // (don't change unless restructuring intentionally)
  const ROSETTA_DIR = path.resolve('./public', 'rosetta');

  const topicFolders = await readdir(ROSETTA_DIR);

  const techFiles = await Promise.all(
    topicFolders.map(async (topic) => {
      return await readdir(`${ROSETTA_DIR}/${topic}`);
    }),
  );

  for (let idx = 0; idx < topicFolders.length; idx++) {
    const topic = topicFolders[idx];
    structure[topic] = techFiles[idx].map((filename) =>
      filename.replace('.md', ''),
    );
  }

  return structure;
};

const genAndWriteStruct = async () => {
  console.log('Generating hierarchy...');
  const struct = await generageRosettaStructure();
  console.log('Done.');

  console.log('Writing hierarchy to a file...');
  const STRUCT_DIR = path.resolve('./public');
  const structPath = path.join(STRUCT_DIR, '__struct.json');
  await writeFile(structPath, Buffer.from(JSON.stringify(struct, null, 2)));
  console.log('Done.');
};

genAndWriteStruct();
