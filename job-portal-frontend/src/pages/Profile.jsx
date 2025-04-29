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

  if (loading) return <p className="text-center text-xl text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-xl text-red-500">{error}</p>;
  if (!profile) return <p className="text-center text-xl text-gray-500">Loading profile...</p>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">My Profile</h2>

      {/* User Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl shadow-lg transition-transform hover:scale-[1.01]">
          <h3 className="text-xl font-semibold text-blue-600 mb-4">Basic Information</h3>
          <p className="text-gray-700"><strong>Name:</strong> {profile.name}</p>
          <p className="text-gray-700"><strong>Email:</strong> {profile.email}</p>
          <p className="text-gray-700"><strong>Role:</strong> {profile.role}</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-2xl shadow-lg transition-transform hover:scale-[1.01]">
          <h3 className="text-xl font-semibold text-green-600 mb-4">Resume & Career</h3>
          <p className="text-gray-700 mb-1">
            <strong>Resume:</strong>{' '}
            <a
              href={profile?.profile?.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Download Resume
            </a>
          </p>
          <p className="text-gray-700"><strong>Experience:</strong> {profile?.profile?.experience}</p>
          <p className="text-gray-700"><strong>Education:</strong> {profile?.profile?.education}</p>
          <p className="text-gray-700"><strong>Skills:</strong> {profile?.profile?.skills?.join(', ')}</p>
        </div>
      </div>

      {/* Edit Form */}
      <div className="bg-white p-8 rounded-2xl shadow-2xl">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Update Profile</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Experience</label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Education</label>
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Skills (comma separated)</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              className="bg-blue-600 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-700 transition duration-200"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
