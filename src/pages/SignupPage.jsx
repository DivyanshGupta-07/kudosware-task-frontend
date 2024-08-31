import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if (key === "resume") {
        formData.append(key, value[0]);
      } else {
        formData.append(key, value);
      }
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "https://kudosware-task-backend.vercel.app/api/v1/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        toast.success("Signup successful!", {
          duration: 3000,
          onClose: () => {
            console.log("response :", response.data);
            setLoading(false);
            navigate("/");
          },
        });
      } else {
        console.error("Signup failed:", response.data);
        toast.error("Signup failed. Please try again.", {
          duration: 3000,
        });
        setLoading(false);
      }
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error("Signup failed. Please try again.", {
        duration: 3000,
      });
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Toaster position="top-center" />
      <h1 className="text-2xl font-bold mb-4">Job Seeker Signup</h1>
      <form
        className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          <label className="block text-gray-700">Title:</label>
          <select
            {...register("title", { required: "Title is required" })}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Title</option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Ms">Ms</option>
            <option value="Dr">Dr</option>
          </select>
          {errors.title && (
            <span className="text-red-500">{errors.title.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">First Name:</label>
          <input
            {...register("firstName", { required: "First Name is required" })}
            type="text"
            className="w-full p-2 border rounded"
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Last Name:</label>
          <input
            {...register("lastName", { required: "Last Name is required" })}
            type="text"
            className="w-full p-2 border rounded"
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Please use a valid email address",
              },
            })}
            type="email"
            className="w-full p-2 border rounded"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Phone Number:</label>
          <input
            {...register("phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^\d{10}$/,
                message: "Phone number should be 10 digits",
              },
            })}
            type="text"
            className="w-full p-2 border rounded"
          />
          {errors.phoneNumber && (
            <span className="text-red-500">{errors.phoneNumber.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">College Name:</label>
          <input
            {...register("collegeName", {
              required: "College Name is required",
            })}
            type="text"
            className="w-full p-2 border rounded"
          />
          {errors.collegeName && (
            <span className="text-red-500">{errors.collegeName.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Course:</label>
          <input
            {...register("course", { required: "Course is required" })}
            type="text"
            className="w-full p-2 border rounded"
          />
          {errors.course && (
            <span className="text-red-500">{errors.course.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Branch:</label>
          <input
            {...register("branch", { required: "Branch is required" })}
            type="text"
            className="w-full p-2 border rounded"
          />
          {errors.branch && (
            <span className="text-red-500">{errors.branch.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">CGPA/SGPA:</label>
          <input
            {...register("cgpa_sgpa", {
              required: "CGPA/SGPA is required",
              pattern: {
                value: /^\d+(\.\d{1,2})?$/,
                message:
                  "CGPA/SGPA should be a number with up to two decimal places",
              },
            })}
            type="text"
            className="w-full p-2 border rounded"
          />
          {errors.cgpa_sgpa && (
            <span className="text-red-500">{errors.cgpa_sgpa.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Year of Graduation:</label>
          <input
            {...register("yearOfGraduation", {
              required: "Year of Graduation is required",
              min: 1900,
              max: 2100,
              valueAsNumber: true,
            })}
            type="number"
            className="w-full p-2 border rounded"
          />
          {errors.yearOfGraduation && (
            <span className="text-red-500">
              {errors.yearOfGraduation.message}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Current Address:</label>
          <input
            {...register("currentAddress", {
              required: "Current Address is required",
            })}
            type="text"
            className="w-full p-2 border rounded"
          />
          {errors.currentAddress && (
            <span className="text-red-500">
              {errors.currentAddress.message}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Proficiency:</label>
          <input
            {...register("proficiency", {
              required: "Proficiency is required",
            })}
            type="text"
            className="w-full p-2 border rounded"
          />
          {errors.proficiency && (
            <span className="text-red-500">{errors.proficiency.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Skills:</label>
          <input
            {...register("skills", { required: "Skills are required" })}
            type="text"
            className="w-full p-2 border rounded"
          />
          {errors.skills && (
            <span className="text-red-500">{errors.skills.message}</span>
          )}
          <small>
            Enter multiple skills separated by commas (e.g., JavaScript, React,
            Node.js)
          </small>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Year of Experience:</label>
          <input
            {...register("yearOfExperience", {
              required: "Year of Experience is required",
              min: 0,
              valueAsNumber: true,
            })}
            type="number"
            className="w-full p-2 border rounded"
          />
          {errors.yearOfExperience && (
            <span className="text-red-500">
              {errors.yearOfExperience.message}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Any Internship?</label>
          <select
            {...register("anyInternship", {
              required: "Internship status is required",
            })}
            className="w-full p-2 border rounded"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {errors.anyInternship && (
            <span className="text-red-500">{errors.anyInternship.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Current Salary:</label>
          <input
            {...register("currentSalary")}
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Not Disclosed"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Expected Salary:</label>
          <input
            {...register("expectedSalary")}
            type="text"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Notice Period:</label>
          <input
            {...register("noticePeriod", {
              required: "Notice Period is required",
            })}
            type="text"
            className="w-full p-2 border rounded"
          />
          {errors.noticePeriod && (
            <span className="text-red-500">{errors.noticePeriod.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">GitHub Profile:</label>
          <input
            {...register("githubProfile", {
              pattern: {
                value: /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9-]+$/,
                message: "Invalid GitHub profile URL",
              },
            })}
            type="text"
            className="w-full p-2 border rounded"
          />
          {errors.githubProfile && (
            <span className="text-red-500">{errors.githubProfile.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">LinkedIn Profile:</label>
          <input
            {...register("linkedinProfile", {
              pattern: {
                value: /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/,
                message: "Invalid LinkedIn profile URL",
              },
            })}
            type="text"
            className="w-full p-2 border rounded"
          />
          {errors.linkedinProfile && (
            <span className="text-red-500">
              {errors.linkedinProfile.message}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Personal Portfolio:</label>
          <input
            {...register("personalPortfolio")}
            type="text"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Any Live Project:</label>
          <input
            {...register("anyLiveProject")}
            type="text"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Resume:</label>
          <input
            {...register("resume", { required: "Resume is required" })}
            type="file"
            className="w-full p-2 border rounded"
          />
          {errors.resume && (
            <span className="text-red-500">{errors.resume.message}</span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
