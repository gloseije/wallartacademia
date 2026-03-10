import crypto from "crypto";

const DEFAULT_TTL_MINUTES = 10;

export function getEmailVerificationOtpTtlMinutes() {
	return DEFAULT_TTL_MINUTES;
}

export function generate6DigitOtp() {
	return Math.floor(100000 + Math.random() * 900000).toString();
}

function getPepper() {
	return process.env.OTP_PEPPER || process.env.BETTER_AUTH_SECRET || "";
}

export function hashOtp(code: string, salt: string) {
	const pepper = getPepper();
	const derivedKey = crypto.scryptSync(`${code}:${pepper}`, salt, 32);
	return derivedKey.toString("hex");
}

export function verifyOtp({
	code,
	salt,
	expectedHash,
}: {
	code: string;
	salt: string;
	expectedHash: string;
}) {
	const actual = hashOtp(code, salt);
	const a = Buffer.from(actual, "hex");
	const b = Buffer.from(expectedHash, "hex");
	if (a.length !== b.length) return false;
	return crypto.timingSafeEqual(a, b);
}

