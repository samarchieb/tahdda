import "../styles/inputComponent.css";
import { FormProvider, useForm } from "react-hook-form";
import { addTask } from "../utils/localStorageUtils";
import { SuccessToast } from "../utils/toasts";
import { FormData } from "../interfaces/Todo";



const InputComponent = ({
  addedTask,
}: {
  addedTask: (added:boolean) => void;
}) => {

  const methods = useForm<FormData>({
    defaultValues: { title: "" },
  });

  
  const onSubmit = (data: FormData) => {
    addTask(data.title);
    methods.setValue("title", "");
    addedTask(true)
    SuccessToast();

  };

  return (
    <div className="todoContainer">
      <h1>ToDo List</h1>
      <FormProvider {...methods}>
        <form
          className="inputContainer"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <div className="inputRow">
            <input
              type="text"
              placeholder="Enter a task"
              className="input"
              {...methods.register("title", {
                required: "Task title is required",
              })}
            />
            <button className="button" type="submit">
              Add
            </button>
          </div>

          {methods.formState.errors.title && (
            <div className="errorRow">
              <span className="error">
                {methods.formState.errors.title.message}
              </span>
            </div>
          )}
        </form>
      </FormProvider>
    </div>
  );
};

export default InputComponent;
