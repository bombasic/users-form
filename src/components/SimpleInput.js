import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameisValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    valueInputBlurHandler: nameBlurHandler,
    resetValue: resetName,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    valueInputBlurHandler: emailBlurHandler,
    resetValue: resetEmail,
  } = useInput((value) => value.includes("@"));

  let formIsValid = false;

  if (enteredNameisValid && enteredEmail) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (nameHasError || !enteredEmailIsValid) {
      return;
    }

    console.log(enteredName + " (state)");
    console.log(enteredEmail);

    resetName();
    resetEmail();
  };

  const nameInputClasses = !nameHasError
    ? "form-control"
    : "form-control invalid";
  const emailInputClasses = !emailHasError
    ? "form-control"
    : "form-control invalid";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameHasError && <p className="error-text">Name must not be empty</p>}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {emailHasError && <p className="error-text">Must include @</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
