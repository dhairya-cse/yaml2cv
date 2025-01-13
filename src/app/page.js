// pages/index.js
import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import { Resume } from '@/components/cv';
import { mergeMapsRecursive } from '@/utils/util';

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
  return YAML.parse(fileContents, { mapAsMap: true });
}

export default Home;