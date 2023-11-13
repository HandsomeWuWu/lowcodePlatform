import { Group } from '@/components/__editor__/types';
import { Button, ButtonPreview } from '..';
import defaultConfig from './defaultConfig';
import properties from './properties';

const ButtonEditor = {
    preview: ButtonPreview,
    view: Button,
    properties,
    group: Group.basics,
    defaultConfig,
    nostyle: true,
}

export default ButtonEditor;