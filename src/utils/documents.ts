export function digitsOnly(value: string) {
  return value.replace(/\D/g, '')
}

export function normalizeStudentRa(value: string) {
  return digitsOnly(value)
}

export function formatStudentRa(value: string) {
  const digits = normalizeStudentRa(value).slice(0, 9)

  if (digits.length <= 8) {
    return digits
  }

  return `${digits.slice(0, 8)}-${digits.slice(8)}`
}

export function isValidStudentRa(value: string) {
  return normalizeStudentRa(value).length === 9
}

export function normalizeCpf(value: string) {
  return digitsOnly(value)
}

export function formatCpf(value: string) {
  const digits = normalizeCpf(value).slice(0, 11)
  const parts = [
    digits.slice(0, 3),
    digits.slice(3, 6),
    digits.slice(6, 9),
    digits.slice(9, 11)
  ]

  if (digits.length <= 3) {
    return parts[0]
  }

  if (digits.length <= 6) {
    return `${parts[0]}.${parts[1]}`
  }

  if (digits.length <= 9) {
    return `${parts[0]}.${parts[1]}.${parts[2]}`
  }

  return `${parts[0]}.${parts[1]}.${parts[2]}-${parts[3]}`
}

export function isValidCpf(value: string) {
  const digits = normalizeCpf(value)

  if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) {
    return false
  }

  const numbers = digits.split('').map(Number)

  function checkDigit(length: number) {
    const sum = numbers
      .slice(0, length)
      .reduce((total, digit, index) => total + digit * (length + 1 - index), 0)
    const remainder = (sum * 10) % 11

    return remainder === 10 ? 0 : remainder
  }

  return checkDigit(9) === numbers[9] && checkDigit(10) === numbers[10]
}
