import WebPageTest from "webpagetest";
const apiKey = 'A.cc65d755f43d133fbf4dc36d16949d30';
const wptPublic = new WebPageTest(WebPageTest.defaultServer.replace('https', 'http'), apiKey);
export { apiKey };
export default wptPublic;
