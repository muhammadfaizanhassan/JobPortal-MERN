import React, { useContext, useEffect, useState } from 'react';
import axios from '../utils/axios';
import AuthContext from '../context/AuthContext';

const Profile = () => {
  const { user, loading } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    experience: '',
    education: '',
    skills: '',
    resume: null,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get('/users/me');
        setProfile(data);
        setFormData({
          experience: data?.profile?.experience || '',
          education: data?.profile?.education || '',
          skills: data?.profile?.skills?.join(', ') || '',
          resume: null,
        });
      } catch (err) {
        setError('Error fetching profile');
      }
    };

    if (user) fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleResumeChange = (e) => {
    setFormData((prev) => ({ ...prev, resume: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('experience', formData.experience);
      data.append('education', formData.education);
      data.append('skills', formData.skills);
      if (formData.resume) {
        data.append('resume', formData.resume);
      }

      const res = await axios.put('/users/me', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setProfile(res.data);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to update profile');
    }
  };

  if (loading) return <p className="text-center text-xl text-gray-500 mt-10">Loading...</p>;
  if (error) return <p className="text-center text-xl text-red-500 mt-10">{error}</p>;
  if (!profile) return <p className="text-center text-xl text-gray-500 mt-10">Loading profile...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-50 via-white to-purple-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">👤 My Profile</h2>

        {/* Profile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-transform hover:scale-[1.01]">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">Basic Information</h3>
            <p className="text-gray-700 mb-2"><strong>Name:</strong> {profile.name}</p>
            <p className="text-gray-700 mb-2"><strong>Email:</strong> {profile.email}</p>
            <p className="text-gray-700"><strong>Role:</strong> {profile.role}</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-transform hover:scale-[1.01]">
            <h3 className="text-xl font-semibold text-green-600 mb-4">Resume & Career</h3>
            <p className="text-gray-700 mb-2">
              <strong>Resume:</strong>{' '}
              {profile?.profile?.resume ? (
                <a
                  href={profile.profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline font-medium"
                >
                  Download Resume
                </a>
              ) : (
                'Not uploaded'
              )}
            </p>
            <p className="text-gray-700 mb-2"><strong>Experience:</strong> {profile?.profile?.experience}</p>
            <p className="text-gray-700 mb-2"><strong>Education:</strong> {profile?.profile?.education}</p>
            <p className="text-gray-700"><strong>Skills:</strong> {profile?.profile?.skills?.join(', ')}</p>
          </div>
        </div>

        {/* Edit Form */}
        <div className="bg-white p-8 rounded-2xl shadow-2xl">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">✏️ Update Profile</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Experience</label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Education</label>
              <input
                type="text"
                name="education"
                value={formData.education}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Skills (comma separated)</label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Upload Resume</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeChange}
                className="w-full text-sm text-gray-600"
              />
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition duration-200 shadow-md"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
