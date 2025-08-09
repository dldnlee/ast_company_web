import React from "react";

const ContactUsCard = () => {
  return (
    <div className="w-full text-white px-6 py-12 md:py-20 flex flex-col items-center 
        bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg">
        
        {/* Top Section */}
        <p className="text-xl text-white text-center">
            Want to work with us? <br />
            <span className="text-purple-400">프로젝트 문의는 언제든지 환영합니다</span>
        </p>

        <h1 className="text-[3rem] md:text-[6rem] font-extrabold tracking-tight flex items-center justify-center gap-4 
            bg-gradient-to-r from-purple-100 to-purple-600 bg-clip-text text-transparent py-7">
            <span>GET</span>
            <span>IN</span>
            <span className="w-12 h-12 md:w-24 md:h-24 rounded-full bg-radial-[at_25%_25%] from-purple-100 to-purple-800 to-75% inline-block"></span>
            <span>TOUCH</span>
        </h1>

        {/* Contact Info */}
        <div className="w-full flex items-centerju justify-center gap-5">
            <img src="company_logos/ASTCompanyWhiteNoBG.png" alt="AST Company" className="w-[180px] border-r"/>
            <div className="h-full"></div>
            <ul className="space-y-1 flex flex-col items-start justify-center">
                <li>contact@astcompany.co.kr</li>
                <li>010-3044-2131</li>
                <li>서울특별시 서초구 매헌로 16, 1313호</li>
            </ul>
        </div>

        </div>

  );
};

export default ContactUsCard;
