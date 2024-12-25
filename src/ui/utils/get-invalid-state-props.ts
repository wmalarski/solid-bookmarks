type GetInvalidStateProps = {
  errorMessageId: string;
  isInvalid: boolean;
};

export const getInvalidStateProps = ({
  errorMessageId,
  isInvalid,
}: GetInvalidStateProps) => {
  if (!isInvalid) {
    return {};
  }

  return {
    "aria-invalid": true,
    "aria-describedby": errorMessageId,
  };
};
