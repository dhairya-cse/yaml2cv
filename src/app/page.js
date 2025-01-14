// pages/index.js
import fs from 'fs';
import path from 'path';
import { Resume } from '@/components/cv';
import { mergeMapsRecursive, yamlContentToMap } from '@/utils/util';

const Home = () => {

  let data = loadYamlToMap('cv.yaml')
  let cv = data.get('cv');
  let config = data.get('config');
  let defaultConfig = loadYamlToMap('config.yaml').get('config');

  config = mergeMapsRecursive(defaultConfig, config);

  return (
    <Resume cv={cv} config={config}></Resume>
  )
};

function loadYamlToMap(fileName) {
  const filePath = path.join(process.cwd(), `/data/${fileName}`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return yamlContentToMap(fileContents);
}

export default Home;