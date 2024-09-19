import {Toast} from '../components';

export const toastConfig = {
  tomatoToast: ({text1, text2}: {text1: string; text2: string}) => (
    <Toast text1={text1} text2={text2} />
  ),
};
