import axios from "axios";
import { actionConfigs } from "./config"

axios.defaults.baseURL = actionConfigs.baseURL;
axios.defaults.headers.post['Content-Type'] = actionConfigs.defaults_headers_post;

export * from './dataActions';
export * from './userActions';
