import WebPageTest from "webpagetest";

const wptPublic = new WebPageTest(WebPageTest.defaultServer.replace('https', 'http'), 'A.cc65d755f43d133fbf4dc36d16949d30');
export default wptPublic;
