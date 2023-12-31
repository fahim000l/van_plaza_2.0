import { AUTH_CONTEXT } from "@/contexts/AuthProvider";
import Main from "@/layouts/Main";
import { useFormik } from "formik";
import React, { useContext, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";

const ContactUs = () => {
  const { authUser } = useContext(AUTH_CONTEXT);
  const form = useRef();

  const Formik = useFormik({
    initialValues: {
      userName: authUser?.userName || "",
      email: authUser?.email || "",
      message: "",
    },
    onSubmit: (values) => {
      console.log(values);
      emailjs
        .sendForm(
          `${process.env.NEXT_PUBLIC_EMAILJS_SERVICEID}`,
          `${process.env.NEXT_PUBLIC_EMAILJS_TEMPLATEID}`,
          form.current,
          `${process.env.NEXT_PUBLIC_EMAILJS_PUBLICKEY}`
        )
        .then(
          (result) => {
            console.log(result.text);
            if (result.text === "OK") {
              Swal.fire("Your message is sent");
              Formik.resetForm();
            }
          },
          (error) => {
            console.log(error.text);
          }
        );
    },
  });

  useEffect(() => {
    if (authUser?.email) {
      Formik.setFieldValue("email", authUser?.email);
      Formik.setFieldValue("userName", authUser?.userName);
    }
  }, [authUser]);

  return (
    <Main>
      <section class="bg-white dark:bg-gray-900">
        <div class="container px-6 py-12 mx-auto">
          <div>
            <p class="font-medium text-blue-500 dark:text-blue-400">
              Contact us
            </p>

            <h1 class="mt-2 text-2xl font-semibold text-gray-800 md:text-3xl dark:text-white">
              Get in touch
            </h1>

            <p class="mt-3 text-gray-500 dark:text-gray-400">
              Our friendly team would love to hear from you.
            </p>
          </div>

          <div class="grid grid-cols-1 gap-12 mt-10 lg:grid-cols-3">
            <form ref={form} onSubmit={Formik.handleSubmit} class="mt-4">
              <div class="flex-1">
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  {...Formik.getFieldProps("userName")}
                  placeholder="Your Name"
                  class="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>

              <div class="flex-1 mt-6">
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Email address
                </label>
                <input
                  required
                  type="email"
                  {...Formik.getFieldProps("email")}
                  placeholder="example@gmail.com"
                  class="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>

              <div class="w-full mt-6">
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Message
                </label>
                <textarea
                  required
                  {...Formik.getFieldProps("message")}
                  class="block w-full h-32 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:h-48 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  placeholder="Message"
                ></textarea>
              </div>

              <button
                type="submit"
                class="w-full px-6 py-3 mt-6 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-50"
              >
                Send
              </button>
            </form>

            <div class="overflow-hidden rounded-lg lg:col-span-2 h-96 lg:h-auto">
              <iframe
                width="100%"
                height="100%"
                frameborder="0"
                title="map"
                marginheight="0"
                marginwidth="0"
                scrolling="no"
                src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=22.3311764,91.8128913+(Marker+Label)&amp;ie=UTF8&amp;t=&amp;z=20&amp;iwloc=B&amp;output=embed"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </Main>
  );
};

export default ContactUs;
