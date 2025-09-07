// import { useEffect, useRef, useState } from 'react';
// import zeapApiSlice from '../../redux/services/zeapApi.slice';
// import Loading from '../../lib/Loading';
// import Banner from '../../lib/Banner';
// import { UserInterface } from '../../interface/interface';
// import { capitalizeFirstLetter } from '../../utils/helpers';

// const Otp = ({
//   close,
//   user,
// }: {
//   close: () => void;

//   user: UserInterface;
// }) => {
//   const [otp1, setOtp1] = useState('');
//   const [otp2, setOtp2] = useState('');
//   const [otp3, setOtp3] = useState('');
//   const [otp4, setOtp4] = useState('');
//   const [error, setError] = useState('');

//   const [sendOtp, sendOtpStatus] = zeapApiSlice.useSendOTPToUserMutation();

//   const isMounted = useRef(false);
//   const pin_id = localStorage.getItem('pin_id');
//   const [verifyOtp, verifyOtpStatus] = zeapApiSlice.useVerifyOtpMutation();

//   useEffect(
//     () => {
//       if (user && !user?.phoneNumberVerifiedt && !isMounted.current) {
//         const payload = { userId: user?.userId };

//         sendOtp({ payload })
//           .unwrap()
//           .then((otp) => {
//             // save pinId to local storage
//             const pin_id = otp.data.pinId;
//             localStorage.setItem('pin_id', pin_id);
//           })
//           .catch((error) => {
//             console.error(error);
//             setError(error.data.error);
//           });
//         isMounted.current = true;
//       }
//     },
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [user],
//   );

//   const handleSubmit = () => {
//     const pin = `${otp1}${otp2}${otp3}${otp4}`;
//     const pin_id = localStorage.getItem('pin_id');
//     const payload = { pin, pin_id, userId: user?.userId };
//     verifyOtp({ payload })
//       .unwrap()
//       .then(() => {
//         close();
//       })
//       .catch((error) => {
//         console.error(error);
//         setError(error.data.error);
//       });
//   };
//   return (
//     <div
//       id="default-modal"
//       tabIndex={-1}
//       aria-hidden="true"
//       className=" overflow-y-auto  fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
//     >
//       <div className="relative  min-h-screen flex flex-col justify-center items-center bg-slate-100  dark:bg-slate-700 overflow-hidden">
//         <div className="w-full max-w-6xl mx-auto px-4 md:px-6 ">
//           <div className="flex justify-center">
//             <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
//               {(verifyOtpStatus.isLoading || sendOtpStatus?.isLoading) && (
//                 <Loading />
//               )}
//               <div className="flex justify-end mb-8">
//                 <button
//                   onClick={() => close()}
//                   className="inline-flex h-10 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded-full px-5 text-sm font-medium tracking-wide  text-danger transition duration-300 bg-slate-200 hover:bg-darkGold hover:text-emerald-600 focus:bg-baseGold focus:text-white focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent"
//                   aria-label="close dialog"
//                 >
//                   <span className="relative only:-mx-5">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       strokeWidth="1.5"
//                       role="graphics-symbol"
//                       aria-labelledby="title-79 desc-79"
//                     >
//                       <title id="title-79">Icon title</title>
//                       <desc id="desc-79">
//                         A more detailed description of the icon
//                       </desc>
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </span>
//                 </button>
//               </div>
//               {!user?.phoneNumberVerified && (
//                 <>
//                   <header className="mb-8">
//                     <h1 className="text-2xl font-bold mb-1">
//                       Mobile Phone Verification
//                     </h1>
//                     {pin_id && (
//                       <>
//                         <p className="text-[15px]  text-slate-500">
//                           Enter the 4-digit verification code that was sent to
//                         </p>{' '}
//                         <strong className="text-[15px] text-slate-500">{`${capitalizeFirstLetter(user?.firstName)}'s  phone number.`}</strong>{' '}
//                       </>
//                     )}
//                   </header>
//                   {error && (
//                     <Banner variant="error" message={error} className="mb-4" />
//                   )}

//                   <div className="flex items-center justify-center gap-3">
//                     <input
//                       type="text"
//                       onChange={(e) => setOtp1(e.target.value)}
//                       className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
//                       pattern="\d*"
//                       maxLength={1}
//                       disabled={
//                         verifyOtpStatus.isLoading || sendOtpStatus?.isLoading
//                       }
//                     />

//                     <input
//                       type="text"
//                       onChange={(e) => setOtp2(e.target.value)}
//                       className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
//                       maxLength={1}
//                       disabled={
//                         verifyOtpStatus.isLoading || sendOtpStatus?.isLoading
//                       }
//                     />
//                     <input
//                       type="text"
//                       onChange={(e) => setOtp3(e.target.value)}
//                       className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
//                       maxLength={1}
//                       disabled={
//                         verifyOtpStatus.isLoading || sendOtpStatus?.isLoading
//                       }
//                     />
//                     <input
//                       type="text"
//                       onChange={(e) => setOtp4(e.target.value)}
//                       className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
//                       maxLength={1}
//                       disabled={
//                         verifyOtpStatus.isLoading || sendOtpStatus?.isLoading
//                       }
//                     />
//                   </div>
//                   <div className="max-w-[260px] mx-auto mt-4">
//                     <button
//                       disabled={
//                         verifyOtpStatus.isLoading || sendOtpStatus?.isLoading
//                       }
//                       onClick={(e) => {
//                         e.preventDefault();
//                         handleSubmit();
//                       }}
//                       className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-darkGold px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-success focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150 disabled:bg-slate-400"
//                     >
//                       Verify Phone Number
//                     </button>
//                   </div>
//                 </>
//               )}
//               {user?.phoneNumberVerified && (
//                 <div>
//                   <Banner
//                     variant="success"
//                     message={`${user?.firstName}'s phome number already verified`}
//                   />{' '}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Otp;
