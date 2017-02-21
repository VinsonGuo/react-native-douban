/**
 * Created by Administrator on 2017/2/20.
 */
import Toast from "react-native-root-toast";
export default class ToastUtil {
  static toast;

  static show(text) {
   /* if (this.toast) {
      this.toast.show(text);
    } else */{
      this.toast = Toast.show(text, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      });
    }
  }

  static hide() {
    if (this.toast) {
      Toast.hide(this.toast);
    }
  }
}