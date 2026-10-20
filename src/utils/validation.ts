const FAKE_SEQUENCES = [
  '123456789',
  '987654321',
  '123123123',
  '000123456',
  '111222333',
  '123456',
  '654321',
  '111111',
  '222222',
  '333333',
  '444444',
  '555555',
  '666666',
  '777777',
  '888888',
  '999999',
  '000000'
];

export function validateBirTin(tin: string): { valid: boolean; message?: string } {
  if (!tin || !tin.trim()) {
    return { valid: false, message: 'Kailangan ilagay ang opisyal na BIR TIN.' };
  }

  const trimmed = tin.trim();

  // Must match official hyphenated format: XXX-XXX-XXX or XXX-XXX-XXX-000 (branch code 000-099)
  const tinPattern = /^\d{3}-\d{3}-\d{3}(-\d{3})?$/;
  if (!tinPattern.test(trimmed)) {
    return {
      valid: false,
      message: 'Hindi tinatanggap ang random na numero. Sundin ang opisyal na BIR TIN format na may gitling (hal. 005-482-910-000).'
    };
  }

  const parts = trimmed.split('-');
  const coreDigits = parts.slice(0, 3).join('');
  const branchCode = parts[3] || '000';

  // Reject all identical digits or sequential/fake patterns
  if (/^(\d)\1+$/.test(coreDigits)) {
    return { valid: false, message: 'Invalid ang BIR TIN (hindi pwedeng magkakaparehong numero).' };
  }

  for (const seq of FAKE_SEQUENCES) {
    if (coreDigits.includes(seq)) {
      return { valid: false, message: 'Invalid ang BIR TIN. Pakilagay ang tunay na BIR TIN mula sa inyong Form 2303.' };
    }
  }

  // First 3 digits cannot be 000
  if (parts[0] === '000' && parts[1] === '000') {
    return { valid: false, message: 'Invalid ang BIR TIN prefix.' };
  }

  // Branch code in PH BIR TINs must start with 0 (e.g. 000 for Head Office, 001, 002...)
  if (!branchCode.startsWith('0')) {
    return {
      valid: false,
      message: 'Ang huling 3 digit (Branch Code) ng BIR TIN ay dapat magsimula sa 0 (hal. 000 para sa Head Office o 001 para sa Branch).'
    };
  }

  return { valid: true };
}

export function validateDtiNumber(dti: string): { valid: boolean; message?: string } {
  if (!dti || !dti.trim()) {
    return { valid: false, message: 'Kailangan ilagay ang opisyal na DTI o SEC Registration Number.' };
  }

  const trimmed = dti.trim().toUpperCase();

  // Reject plain random numbers without official DTI / BN / SEC / CDA prefix
  if (/^\d+$/.test(trimmed)) {
    return {
      valid: false,
      message: 'Hindi tinatanggap ang purong random na numero. Isama ang opisyal na prefix (hal. DTI-2026-882910, BN-4829104, o SEC-2025-109283).'
    };
  }

  // Must match official prefix format: DTI-YYYY-XXXXXX, BN-XXXXXXX, SEC-XXXXXXX, or CDA-XXXXXXX
  const dtiPattern = /^(DTI|BN|SEC|CDA)-(20\d{2}-)?\d{6,8}$/;
  if (!dtiPattern.test(trimmed)) {
    return {
      valid: false,
      message: 'Hindi wasto ang format. Gumamit ng opisyal na format: DTI-YYYY-XXXXXX (6-8 digits), BN-XXXXXXX, o SEC-XXXXXXX (hal. DTI-2026-482910).'
    };
  }

  const digitsOnly = trimmed.replace(/\D/g, '');
  const serialPart = digitsOnly.length > 4 && trimmed.includes('-20') ? digitsOnly.slice(4) : digitsOnly;

  if (/^(\d)\1+$/.test(serialPart)) {
    return { valid: false, message: 'Invalid ang DTI/SEC registration serial number.' };
  }

  for (const seq of FAKE_SEQUENCES) {
    if (serialPart.includes(seq)) {
      return { valid: false, message: 'Invalid o peke ang DTI/SEC number (sequential numbers detected).' };
    }
  }

  return { valid: true };
}
