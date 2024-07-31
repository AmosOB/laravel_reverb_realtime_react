import React from "react";

const Message = ({ userId, message, authUserId }) => {
    const isAuth = message.id === authUserId;

    return (

        <div className="row d-flex justify-content-center">
            <div className="col-md-8">
               <div className="">
                {authUserId === message.user_id ? (

                    <div className="float-end mb-3">
                        <small className="text-muted">
                            <strong>You</strong>
                        </small>
                        <div className='alert alert-primary'>
                            {message.text}
                        </div>
                        <span className="text-muted float-right">
                            {message.time}
                        </span>
                    </div>

                ) : (

                    <div className="float-start mb-3">
                        <small className="text-muted">
                            <strong>{message.user.name}</strong>
                        </small>

                        <div className="alert alert-secondary">
                            {message.text}
                        </div>

                        <small className="text-muted float-right">
                            {message.time}
                        </small>
                    </div>
                )}
               </div>
            </div>
        </div>
    );
};

export default Message;
