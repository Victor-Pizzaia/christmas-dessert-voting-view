import { isEmail, isCPF, formatCPF } from "./utils";

describe("isEmail", () => {
  it("returns true for valid emails", () => {
    expect(isEmail("user@example.com")).toBe(true);
    expect(isEmail("test@domain.co")).toBe(true);
  });

  it("returns false for invalid emails", () => {
    expect(isEmail("")).toBe(false);
    expect(isEmail("not-email")).toBe(false);
    expect(isEmail("@domain.com")).toBe(false);
  });
});

describe("isCPF", () => {
  it("returns true for valid CPFs", () => {
    expect(isCPF("529.982.247-25")).toBe(true);
    expect(isCPF("52998224725")).toBe(true);
  });

  it("returns false for invalid CPFs", () => {
    expect(isCPF("")).toBe(false);
    expect(isCPF("111.111.111-11")).toBe(false);
    expect(isCPF("123")).toBe(false);
  });
});

describe("formatCPF", () => {
  it("formats CPF with mask", () => {
    expect(formatCPF("52998224725")).toBe("529.982.247-25");
  });

  it("masks partial input", () => {
    expect(formatCPF("529")).toBe("529");
    expect(formatCPF("5299")).toBe("529.9");
    expect(formatCPF("529982")).toBe("529.982");
    expect(formatCPF("5299822")).toBe("529.982.2");
  });

  it("strips non-digit characters", () => {
    expect(formatCPF("abc529.982.247-25def")).toBe("529.982.247-25");
  });

  it("limits to 11 digits", () => {
    expect(formatCPF("52998224725123")).toBe("529.982.247-25");
  });
});
