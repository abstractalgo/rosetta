const { readdir, writeFile, readFile } = require('fs/promises');
const pathFS = require('path');
const yaml = require('yaml');

const generateTopicsMeta = async () => {
  const TOPICS_DIR = pathFS.resolve('./public', 'topics');

  const topicIds = await readdir(TOPICS_DIR);
  const topicsMetaFiles = await Promise.all(
    topicIds.map(
      async (topicId) =>
        await readFile(pathFS.join(TOPICS_DIR, topicId, 'about.yml'), {
          encoding: 'utf-8',
        }),
    ),
  );

  const topics = await Promise.all(
    topicIds.map(async (topicId, idx) => {
      const meta = yaml.parse(topicsMetaFiles[idx]);
      console.log(topicId);
      console.log(meta);
      const techs = (await readdir(pathFS.join(TOPICS_DIR, topicId)))
        .filter((filename) => filename !== 'about.yml')
        .map((filename) => filename.replace('.md', ''));

      return {
        id: topicId,
        label: meta['label'],
        description: meta['description'],
        categories: meta['categories'] || [],
        availableTechs: techs,
      };
    }),
  );

  return {
    topics,
  };
};

const genAndWriteStruct = async () => {
  console.log('Generating topics meta...');
  const struct = await generateTopicsMeta();
  console.log('Done.');

  console.log('Writing topics meta to a file...');
  const STRUCT_DIR = pathFS.resolve('./scripts');
  const structPath = pathFS.join(STRUCT_DIR, 'topics_meta.json');
  await writeFile(structPath, Buffer.from(JSON.stringify(struct, null, 2)));
  console.log('Done.');
};

genAndWriteStruct();
