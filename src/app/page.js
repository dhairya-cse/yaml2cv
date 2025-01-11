// pages/index.js
import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import { Resume } from './cv';

const Home = () => {

  let data = loadYamlToMap('cv.yaml')
  let cv = data.get('cv');
  let config = data.get('config');
  let defaultConfig = loadYamlToMap('config.yaml');

  //TODO: merge config from the yaml file to the default config

  return (
    <Resume cv={cv} config={defaultConfig}></Resume>
  )
};

function loadYamlToMap(fileName) {
  const filePath = path.join(process.cwd(), `/data/${fileName}`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return YAML.parse(fileContents, { mapAsMap: true });
}

export default Home;