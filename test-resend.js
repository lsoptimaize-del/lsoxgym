const { Resend } = require('resend');
const resend = new Resend('re_NSNFJKWQ_DD4ykpsBGYfaZUdcSVdH6HKH');

async function test() {
  const res = await resend.emails.send({
    from: "Athul @ LS OptimAIze <info@lsoptimaize.com>",
    to: "test@example.com",
    subject: "Test",
    html: "<p>Test</p>"
  });
  console.log(JSON.stringify(res, null, 2));
}
test();
