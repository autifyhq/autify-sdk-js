import axios from "axios";

// Axios set several default encodings but we'd like to keep it as plain text since it's JSON API.
axios.defaults.headers["Accept-Encoding"] = null;
