import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { userInfo } from 'os';
import { UserModel } from '../../components/Models/User/UserModel';
import { AlertOptions } from '../../components/Models/Alerts/alertsModel';
import Alert from '../../components/reuseables/alerts';
import clsx from 'clsx';
import { FaEyeSlash, FaEye } from 'react-icons/fa6';
const SettingsPage = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [typingTimeout, setTypingTimeout] = useState<number | null>(null);
  const [changePassword, promptPasswordChange] = useState(false);
  const tokenSaved = useSelector((state: RootState) => state.auth.token);
  const [iscurrentPasswordCorrect, setiscurrentPassword] = useState(false);
  const [iscurrentPasswordChecking, setiscurrentPasswordChecking] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    // Set page title
    document.title = "Watch | Stream";

    const getUserInfo = async () => {
      const response = await fetch(`https://livestreamdemo.romarioburke.me/api/user/get`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenSaved}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setName(data.name);
        setEmail(data.email);
        console.log(data);
      }
    };
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenSaved]);
  const handleCurrentPasswordChecker = async (inputValue: string) => {

    console.log(inputValue);
    setCurrentPassword(inputValue);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    // Set a new timeout to handle user "done typing"
    const timeoutId = window.setTimeout(async () => {
      console.log('User finished typing:', inputValue);
      const response = await fetch(`https://livestreamdemo.romarioburke.me/ / api / user / checkpassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenSaved}`,
        },
        body: JSON.stringify({ password: inputValue })
      })
      if (response.ok) {
        setiscurrentPasswordChecking(true)
        const data = await response.json();
        switch (data.message) {
          case 'C':
            setiscurrentPassword(true);
            break;
          case 'I':
            setiscurrentPassword(false);
            break;
        }
        console.log(data);
      }
    }, 1000); // 1 second delay after typing stops

    setTypingTimeout(timeoutId); // Save the timeout ID

  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`https://livestreamdemo.romarioburke.me/api/user/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenSaved}`,
      },
      body: JSON.stringify({ name: name, email: email, password: changePassword ? newPassword : currentPassword })
    })

    if (response.ok) {
      //console.log('Updated');
      const alertsModel: AlertOptions = {
        type: 'Updated',
        title: 'Account Updated',
        message: 'Your account was updated successfully!',
        userID: null,
        token: tokenSaved
      }
      Alert(alertsModel);
    }
  };

  return (
    <div className="p-4 sm:p-8">
      <h2 className="text-2xl mb-4 text-white">Account Settings</h2>
      <div className="max-w-6xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-white">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full mt-2"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-white">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full mt-2"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Current Password */}
          <div className="flex items-center gap-4">
            {/* Current Password Section */}
            <div className="flex items-center relative w-full md:w-1/2">
              <input
                type={showPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => handleCurrentPasswordChecker(e.target.value)}
                className="input input-bordered w-full"
                placeholder="Enter your current password"
                required={changePassword}
              />
              <button
                type="button"
                className="absolute right-2 text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Change Password Button */}
            <button
              type="button"
              onClick={() => promptPasswordChange(!changePassword)}
              className="btn btn-primary text-white"
            >
              {changePassword ? 'Don’t Change Password' : 'Change Password'}
            </button>
          </div>

          {/* Password Status Message */}
          <div className="mt-2">
            <span className={clsx('w-full', iscurrentPasswordChecking ? 'block' : 'hidden', iscurrentPasswordCorrect ? 'text-green-600' : 'text-red-600')}>
              {iscurrentPasswordCorrect ? 'The current password is correct' : 'The password does not match'}
            </span>
          </div>
          {changePassword ? (
            <>
              <div className="transition-opacity duration-1000 ease-in-out">
                <label className="block text-sm font-medium text-white">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="input input-bordered w-full mt-2"
                  placeholder="Enter your new password"
                />
              </div>

              <div className="transition-opacity duration-1000 ease-in-out">
                <label className="block text-sm font-medium text-white">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input input-bordered w-full mt-2"
                  placeholder="Confirm your new password"
                />
              </div>
            </>
          ) : (<></>)
          }
          {/* Submit Button */}
          <div className="flex justify-center">
            <button type="submit" className="btn btn-primary w-1/2 text-white">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;