import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/api/auth/login', {
        email: formData.email,
        password: formData.password
      });

      console.log('Login response:', response.data);

      // Store token in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      console.log('Token stored, navigating...');

      // Redirect based on role
      if (response.data.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.response?.data?.message || err.response?.data?.error || 'Login failed. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
		<>
			<section className="grid grid-cols-2 w-full h-fit bg-white">
				<div className="w-full h-full bg-white p-10 relative">
					{/* Login Type Tabs */}
					<div className="mb-8 flex gap-4 border-b border-gray-300">
						<button
							onClick={() => {
								setIsAdminLogin(false);
								setError('');
								setFormData({ email: '', password: '' });
							}}
							className={`pb-3 px-4 font-semibold text-lg transition-all ${
								!isAdminLogin
									? 'border-b-2 border-[#775fab] text-[#775fab]'
									: 'text-gray-500 hover:text-gray-700'
							}`}
						>
							<i className="fa-solid fa-user mr-2"></i>
							User Login
						</button>
						<button
							onClick={() => {
								setIsAdminLogin(true);
								setError('');
								setFormData({ email: '', password: '' });
							}}
							className={`pb-3 px-4 font-semibold text-lg transition-all flex items-center ${
								isAdminLogin
									? 'border-b-2 border-[#775fab] text-[#775fab]'
									: 'text-gray-500 hover:text-gray-700'
							}`}
						>
							<i className="fa-solid fa-lock mr-2"></i>
							Admin Login
						</button>
					</div>

					<div className="mb-10">
						<h1 className="text-6xl text-center pb-4">
							{isAdminLogin ? 'Admin Access' : 'Welcome Back'}
						</h1>
						<p className="text-[1rem] font-light pb-3 text-center">
							{isAdminLogin
								? 'Enter your admin credentials to access the admin dashboard'
								: 'Enter your email and password to access your account'
							}
						</p>
					</div>

					{/* Error Message */}
					{error && (
						<div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center gap-2">
							<i className="fa-solid fa-circle-exclamation"></i>
							{error}
						</div>
					)}

					{/* Admin Notice */}
					{isAdminLogin && (
						<div className="mb-4 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded-lg flex items-center gap-2">
							<i className="fa-solid fa-shield"></i>
							<span>Restricted access. Only authorized administrators can login here.</span>
						</div>
					)}

					<form className="flex flex-col gap-3" onSubmit={handleSubmit}>
						<div className="flex flex-col gap-3">
							<label htmlFor="email" className="text-xl">
								Email:
							</label>
							<input
								type="email"
								name="email"
								id="email"
								placeholder="Enter your email"
								value={formData.email}
								onChange={handleChange}
								required
								className="w-full bg-blue-100/70 font-light text-black border outline-none border-white focus:border-indigo-700  hover:border hover:border-blue-500 rounded-sm text-m p-2"
							/>
						</div>

						<div className="flex flex-col gap-3">
							<label htmlFor="password" className="text-xl">
								Password:{" "}
							</label>
							<input
								type="password"
								name="password"
								id="password"
								placeholder="Enter your password"
								value={formData.password}
								onChange={handleChange}
								required
								className="w-full bg-blue-100 font-light border outline-none border-white focus:border-indigo-700  hover:border hover:border-blue-500 rounded-sm text-m p-2"
							/>
						</div>

						<div className="flex justify-between">
							<div className="flex gap-2 text-m justify-center items-center">
								<input
									type="checkbox"
									name="remember"
									id="remember"
									className="mt-1"
								/>
								<label htmlFor="remember">Remember me</label>
							</div>
							<p className="text-m">
								<Link
									to="/forgetpassword"
									className="hover:text-[#dd00ff] underline"
								>
									Forgot Password?
								</Link>
							</p>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full text-white bg-black p-2 cursor-pointer text-m rounded-[17px_4px] mb-0.5 transform hover:scale-104 transition-all duration-300 ease-in-out border border-white disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{loading ? 'Logging in...' : 'Login'}
						</button>
						<button
							type="button"
							className="flex justify-center items-center gap-3 my-2 transform text-m rounded-[4px_17px] hover:scale-104 transition-all duration-300 ease-in-out border p-2 mb-25"
						>
							<img
								src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png"
								alt="google"
								width={20}
								height={20}
							/>{" "}
							Login with Google
						</button>
					</form>

					<div className="absolute flex justify-center left-1/2 transform -translate-x-1/2 -translate-y-1/2 bottom-2 text-center">
						<h1 className="">
							Don't have an account?{" "}
							<Link
								to="/knowus"
								className="text-[#9308d8] underline transform hover:text-[#dd00ff]"
							>
								Sign Up
							</Link>
						</h1>
					</div>
				</div>
				<div className="relative">
					<div className='w-80 bg-linear-to-r from-white via-transparent to-transparent h-full z-1 absolute top-0 left-0'>

					</div>
					<img
						src="/images/login.jpg"
						alt="people"
						className="h-full bg-center object-center object-cover"
					/>
				</div>
			</section>
		</>
  );
}

export default Login;