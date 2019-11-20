import { slugify } from '../';

it("Transforms strings to keys or 'slugs'", () => {
  const slug = slugify('I am a String');

  expect(slug).toBe('i-am-a-string');
});
