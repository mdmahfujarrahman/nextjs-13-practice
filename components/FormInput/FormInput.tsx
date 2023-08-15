type Props = {
    type?: string;
    title: string;
    state: string;
    placeholder: string;
    isTextArea?: boolean;
    setState: (value: string) => void;
};

const FormInput = ({
    type,
    title,
    state,
    placeholder,
    isTextArea,
    setState,
}: Props) => {
    return (
        <div className="flex justify-start items-start flex-col w-full gap-4">
            <label htmlFor="w-full text-gray-100">{title}</label>
            {isTextArea ? (
                <textarea
                    required
                    value={state}
                    placeholder={placeholder}
                    className="form_field-input"
                    onChange={(e) => setState(e.target.value)}
                />
            ) : (
                <input
                    required
                    type={type || "text"}
                    value={state}
                    placeholder={placeholder}
                    className="form_field-input"
                    onChange={(e) => setState(e.target.value)}
                />
            )}
        </div>
    );
};

export default FormInput;
