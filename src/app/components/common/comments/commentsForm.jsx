import React, { useState, useEffect } from "react";
import api from "../../../api";
import PropTypes from "prop-types";
import SelectField from "../form/selectField";
import TextareaField from "../form/textareaField";
import { validator } from "../../../utils/validator";

const initialFormData = { userId: "", content: "" };

const CommentForm = ({ userId, onSubmit }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(initialFormData);
    const [users, setUsers] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setLoading(true);
        api.users.fetchAll().then(data => {
            const filteredUsers = data.filter(user => user._id !== userId);

            const modifiedUsers = Object.keys(filteredUsers).map((userId) => ({
                label: filteredUsers[userId].name,
                value: filteredUsers[userId]._id
            }));
            setUsers(modifiedUsers);
            setLoading(false);
        });
    }, []);

    const validatorConfig = {
        userId: {
            isRequired: {
                message: "Выберите отправителя"
            }
        },
        content: {
            isRequired: {
                message: "Введите ссобщение"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (target) => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const resetForm = () => {
        setData(initialFormData);
        setErrors({});
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        resetForm();
    };

    return (
        <>
            {loading
                ? <p>loading...</p>
                : (
                    <div className="card mb-2">
                        <div className="card-body">
                            <div>
                                <h2>New comment</h2>
                                <form onSubmit={handleSubmit}>
                                    <SelectField
                                        value={data.userId}
                                        onChange={handleChange}
                                        defaultOption="Выберите пользователя"
                                        options={users}
                                        error={errors.userId}
                                        name="userId"
                                    />
                                    <TextareaField
                                        label="Сообщение"
                                        name="content"
                                        value={data.content}
                                        onChange={handleChange}
                                        error={errors.content}
                                    />

                                    <div className="d-flex justify-content-end mb-2">
                                        <button className="btn btn-primary">Опубликовать</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                )
            }
        </>

    );
};

CommentForm.propTypes = {
    userId: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default CommentForm;
