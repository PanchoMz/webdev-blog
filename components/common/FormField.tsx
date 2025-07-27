import { cn } from "@/lib/utils";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";



interface FormFieldProps<T extends FieldValues> {
  id: string;
  type?: string;
  disabled?: boolean;
  placeholder: string;
  label?: string;
  inputClassName?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors;
}

const FormField = <T extends FieldValues>({
  id,
  type,
  disabled,
  placeholder,
  label,
  inputClassName,
  register,
  errors,
}: FormFieldProps<T>) => {
  const message = errors[id] && (errors[id]?.message as string);

  return (
    <div>
      {label && <span className="block text-sm">{label}</span>}
      <input
        id={id}
        type={type}
        disabled={disabled}
        {...register(id as Path<T>)}
        placeholder={placeholder}
        className={cn(
          "w-full p-3 my-2 outline-none rounded-md border disabled:opacity-70 disabled:cursor-not-allowed border-slate-300 dark:border-slate-700 focus:border-slate-500 dark:focus:border-slate-400",
          errors[id] && "border-rose-400 focus:border-rose-500",
          inputClassName
        )}
      />
      {message && <span className="text-sm text-rose-400">{message}</span>}
    </div>
  );
};

export default FormField;
