"use client"

import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import clsx from "clsx";
import { Fragment } from "react";
import { IoClose } from "react-icons/io5";

interface ModelProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode
    heading: string,
    style?:string
}
const Model: React.FC<ModelProps> = ({ isOpen, onClose, children ,heading,style}) => {
    return (
        <Transition
            show={isOpen}
            as={Fragment}
        >
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <TransitionChild as={Fragment} enter="ease-out duration-300 "
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className={clsx(style ? "fixed inset-0  bg-opacity-75   transition-opacity " :"fixed inset-0 bg-gray-500 bg-opacity-75   transition-opacity ")}/>



                </TransitionChild>
                <div className={clsx(style ? style :"inset-0","fixed z-0 overflow-y-auto")}>
                    <div className="
                            flex 
                            min-h-full 
                            items-center 
                            justify-center 
                          
                            text-center
                            sm:p-0 ">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:traslate-y-0 sm:scale-900"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                
                            <DialogPanel className="ralative
                                 transform
                                overflow-hidden
                                rounded-lg
                              bg-white
                                px-4
                                pb-4
                                text-left
                                shadow-xsl
                                transition-all
                                w-[350px]
                                sm:my-8
                                sm:w-[400px]
                                md:w-[400px]
                                sm:max-w-lg
                                sm:p-6
                                ">
                                <div className="absolute right-0
                                     top-0
                                     h-10
                                     text-center
                                     bg-green-600
                                     w-[400px]
                                    items-center
                                      pr-4
                                       pt-4
                                       
                                         z-10
                                         ">
                                    <span className="absolute
                                        top-2
                                        left-20 sm:left-14 md:left-5 text-center  font-semibold  text-gray-900  ">{heading}</span>
                                    <button
                                       type="button"
                                       className="
                                        rounded-md
                                        absolute
                                        top-2
                                        right-5
                                     
                                      text-gray-500
                                        focus:outline-none
                                       hover:text-gray-500
                                        focus:ring-2
                                      focus:ring-sky-500
                                        focus:ring-offset-2 "
                                        onClick={onClose} >
                                        <span className="sr-only">Close</span>
                                        <IoClose className="h-6 w-6 text-white"/>
                                    </button>

                                </div>
                              

                                {children}

                            </DialogPanel>

                        </TransitionChild>

                    </div>
                </div>

            </Dialog>

        </Transition>
    )
}

export default Model
