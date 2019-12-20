import getContentType from "./get-content-type-by-url";

it("works", async () => {
  const ct = await getContentType("https://aws.amazon.com/favicon.ico");

  expect(ct).toBe("image/x-icon");
});
