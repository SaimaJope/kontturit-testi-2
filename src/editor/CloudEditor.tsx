import { Keystatic } from '@keystatic/core/ui';
import type { Config } from '@keystatic/core';
import localConfig from '../../keystatic.config';

const project = import.meta.env.PUBLIC_KEYSTATIC_CLOUD_PROJECT;
const config: Config = {
  ...localConfig,
  ui: { brand: { name: 'Kontturi · Sisällönhallinta' }, navigation: { 'Sivuston sisältö': ['news','services','people','offices','pages'], 'Etusivu': ['home'] } },
  storage: { kind: 'cloud' },
  cloud: { project },
};

export default function CloudEditor() {
  if (!project) return <p>Verkkoeditorin yhteyttä ei ole määritetty.</p>;
  return <Keystatic config={config} />;
}
