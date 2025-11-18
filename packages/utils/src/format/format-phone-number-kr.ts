export const formatPhoneNumberKR = (phone: string) => {
  const phoneNumber = phone.replace(/[^0-9]/g, "");
  const areaCode = phoneNumber.slice(0, 3);
  const length = phoneNumber.length;

  // exception for 2 digit area code (서울 02)
  if (areaCode.indexOf("02") !== -1) {
    if (length >= 3 && length <= 6) {
      return phoneNumber.replace(/(\d{2})(\d)/, "$1-$2");
    }

    if (length > 6 && length < 10) {
      return phoneNumber.replace(/(\d{2})(\d{3})(\d)/, "$1-$2-$3");
    }

    // 9자리: 02-1234-1234 (집/회사 전화번호)
    if (length === 9) {
      return phoneNumber.replace(/(\d{2})(\d{4})(\d{3})/, "$1-$2-$3");
    }

    // 10자리: 02-1234-5678
    if (length >= 10) {
      return phoneNumber
        .slice(0, 10)
        .replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3");
    }
  }

  // 일반 지역번호 (031, 032, 041, 042, 043, 051, 052, 053, 054, 055, 061, 062, 063, 064) 및 핸드폰번호 (010, 011 등)
  if (length >= 3 && length <= 6) {
    return phoneNumber.replace(/(\d{3})(\d)/, "$1-$2");
  }

  if (length > 6 && length < 10) {
    return phoneNumber.replace(/(\d{3})(\d{3})(\d)/, "$1-$2-$3");
  }

  // 10자리: 031-123-4567 (일반 지역번호)
  if (length === 10) {
    return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  }

  // 11자리: 010-1234-5678 (핸드폰번호)
  if (length >= 11) {
    return phoneNumber
      .slice(0, 11)
      .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  }

  return phoneNumber;
};
