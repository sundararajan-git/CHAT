import toast from "react-hot-toast";

// validate the forms
export const validateForm = (form: any) => {
  try {
    let isValid = true;

    Array.from(form.elements).forEach((element: any) => {
      if (element.required && !element.value) {
        isValid = false;
        const validElement = document.getElementById(
          element?.name
        ) as HTMLElement;

        validElement.classList.add("border-red-600");

        if (element.type === "file") {
          const ele = document.getElementById(
            `${element.name}`
          ) as HTMLInputElement;
          ele.classList.add("border-red-600");
        }
      } else if (element?.required) {
        const validElement = document.getElementById(
          element?.name
        ) as HTMLElement;

        validElement.classList.remove("border-red-600");

        if (element.type === "file") {
          const ele = document.getElementById(
            `${element.name}`
          ) as HTMLInputElement;
          ele.classList.remove("border-red-600");
        }
      }
    });
    return isValid;
  } catch (err) {
    console.error(err);
  }
};

// show all errors
export const showErrorToast = (err: any) => {
  console.log(err);
  toast.error(err?.response?.data?.message ?? "Internal server error");
};

//  for number input filed scroll to change prevent
export const handleWheel = (e: any) => {
  e.target.blur();
};
