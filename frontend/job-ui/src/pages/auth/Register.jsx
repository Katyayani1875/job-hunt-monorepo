  import { useState } from 'react';
  import { Link, useNavigate } from 'react-router-dom';
  import toast from 'react-hot-toast';
  import { motion } from 'framer-motion';
  import axios from 'axios';
  import { Loader2 } from 'lucide-react';

  const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      role: 'candidate',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    };

    const handleRegister = async (e) => {
      e.preventDefault();
      const { name, email, password, role } = formData;

      if (!name || !email || !password || !role) {
        toast.error('All fields are required');
        return;
      }

      setLoading(true);
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/users/register`,
          formData,
          { withCredentials: true }
        );

        const token = res.data.token;
        if (token) {
          login(res.data.user, token);
        }

        toast.success('Registration successful. Logged in!');
        navigate('/home');
      } catch (err) {
        toast.error(err.response?.data?.message || 'Registration failed');
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="min-h-screen flex bg-[#0C1A2B] text-white font-['Inter']">
        {/* Left Section - Branding */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br from-[#13233e] to-[#0C1A2B] p-12">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-md space-y-6"
          >
            <img src="/logo.png" alt="Logo" className="w-16 h-16 mb-4" />
            <h1 className="text-4xl font-bold leading-tight font-['Playfair_Display']">
              Join a Premium Network of Professionals
            </h1>
            <p className="text-white/70 text-lg">
              Discover jobs, build your profile, and connect with top companies using AI.
            </p>
          </motion.div>
        </div>

        {/* Right Section - Form */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 flex items-center justify-center px-6 py-12"
        >
          <form
            onSubmit={handleRegister}
            className="w-full max-w-md bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20 space-y-6"
          >
            <h2 className="text-3xl font-bold text-center">Create Your Account</h2>

            {['name', 'email', 'password'].map((field) => (
              <div key={field} className="relative">
                <input
                  type={field === 'password' ? 'password' : field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder=" "
                  className="w-full px-4 pt-5 pb-2 bg-white/10 text-white border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                />
                <label className="absolute left-4 top-2 text-white/70 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/50 peer-focus:top-2 peer-focus:text-sm">
                  {field === 'name' ? 'Full Name' : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
              </div>
            ))}

            {/* Role Selector */}
            <div>
              <label className="block text-sm text-white/70 mb-1">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 text-white border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="candidate">Candidate</option>
                <option value="employer">Employer</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-teal-400 hover:brightness-110 transition shadow-lg font-semibold"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="animate-spin w-5 h-5 mr-2" /> Creating...
                </span>
              ) : (
                'Register'
              )}
            </button>

            <p className="text-center text-sm text-white/70">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-400 hover:underline">
                Login here
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    );
  };

  export default Register;
