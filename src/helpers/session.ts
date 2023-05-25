import crypto from "crypto";

function generate(length: number) {
  const randomBytes = crypto.randomBytes(Math.ceil(length / 2));
  return randomBytes.toString("hex").slice(0, length);
}

const generateSessionId = () => {
	return generate(32);
};

export { generateSessionId };
