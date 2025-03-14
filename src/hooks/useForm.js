import { useState } from 'react';

const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleSubmit = (callback) => (e) => {
        e.preventDefault();
        if (validate()) {
            callback(values);
        }
    };

    const validate = () => {
        let tempErrors = {};
        // Add validation logic here
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    return {
        values,
        errors,
        handleChange,
        handleSubmit,
    };
};

export default useForm;