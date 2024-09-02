import React, { useState } from 'react';
import { GoArrowRight } from "react-icons/go";
import { Modal } from 'flowbite';
import { FaRegCheckCircle } from "react-icons/fa";

function ServiceCard({ keyId, service_name, service_icon, service_description, key_points }) {

    const [modalInstance, setModalInstance] = useState(null);

    const toggleModal = (isOpen) => {
        if (isOpen) {
            modalInstance.show();
        } else {
            modalInstance.hide();
        }
    }

    React.useEffect(() => {
        const modalElement = document.getElementById(`serviceInfo-modal-${keyId}`);
        if (modalElement) {
            setModalInstance(new Modal(modalElement));
        }
    }, [keyId]);

    return (
        <>
            <div className="relative w-[90%] flex flex-col justify-end py-8 px-8 xxsx:px-4 smx:w-[90vw] border-[1px] border-blue-500 rounded-lg hover:shadow-md hover:shadow-blue-400" key={keyId}>
                <div className='flex flex-col items-start mt-8'>
                    <div className="w-8 mb-4">{service_icon}</div>
                    <h3 className="text-2xl font-semibold mb-4">{service_name}</h3>
                </div>

                <span
                    className="flex items-center gap-2 cursor-pointer text-blue-500"
                    onClick={() => toggleModal(true)}
                >
                    View More {" "}
                    <GoArrowRight className='mt-1' />
                </span>
            </div>

            {/* Main modal */}
            <div
                id={`serviceInfo-modal-${keyId}`}
                tabIndex="-1"
                aria-hidden="true"
                className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
                <div className="relative p-8 w-full max-w-2xl max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="flex items-center justify-center gap-4 text-xl font-semibold text-gray-900 dark:text-white">
                                <div className="w-8">{service_icon}</div> {service_name}
                            </h3>
                            <button
                                type="button"
                                onClick={() => toggleModal(false)}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* Modal body */}
                        <div className="p-4 md:p-5 space-y-4 flex flex-col items-center gap-4">
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                {service_description}
                            </p>

                            <ul className="services__modal-services grid gap-2">
                                {key_points.map((data, index) => (
                                    <li key={index} className="flex items-center gap-4">
                                        <FaRegCheckCircle className='text-blue-500' />
                                        <p className="text-gray-500">{data}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Modal Footer */}
                        <div className='p-8 flex items-center justify-center gap-4'>
                        <button data-modal-hide="popup-modal" type="button" class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-8 py-2.5 text-center">
                            Hire Me
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ServiceCard;
