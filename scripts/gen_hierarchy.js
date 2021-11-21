const { readdir, writeFile } = require('fs/promises');
const path = require('path');

const generageRosettaHierarchy = async () => {
  const hierarchy = {};

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
    hierarchy[topic] = techFiles[idx].map((filename) =>
      filename.replace('.md', ''),
    );
  }

  return hierarchy;
};

const genAndWriteStruct = async () => {
  console.log('Generating hierarchy...');
  const struct = await generageRosettaHierarchy();
  console.log('Done.');

  console.log('Writing hierarchy to a file...');
  const STRUCT_DIR = path.resolve('./scripts');
  const structPath = path.join(STRUCT_DIR, 'hierarchy.json');
  await writeFile(structPath, Buffer.from(JSON.stringify(struct, null, 2)));
  console.log('Done.');
};

genAndWriteStruct();
