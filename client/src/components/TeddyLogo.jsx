// Teddy Logo Component - Dark Lavender Theme
const TeddyLogo = ({ size = 'default' }) => {
    const sizeClasses = {
        small: 'w-10 h-10',
        default: 'w-10 h-10',
        large: 'w-14 h-14'
    };

    const earSizeClasses = {
        small: 'w-5 h-5 -top-1 -left-1',
        default: 'w-5 h-5 -top-1 -left-1',
        large: 'w-6 h-6 -top-1 -left-1'
    };

    return (
        <div className={`relative flex items-center justify-center ${sizeClasses[size]} bg-gradient-to-br from-[#b19cd9] to-[#8b5cf6] rounded-full shadow-lg shadow-[#b19cd9]/30 border-2 border-[#ddd6fe]/20`}>
            {/* Left Ear */}
            <div className={`absolute ${earSizeClasses[size]} -right-1 bg-gradient-to-br from-[#a78bfa] to-[#8b5cf6] rounded-full -z-10 shadow-md`} />
            {/* Right Ear */}
            <div className={`absolute ${earSizeClasses[size].replace('-left-1', '-right-1')} bg-gradient-to-br from-[#a78bfa] to-[#8b5cf6] rounded-full -z-10 shadow-md`} />
        </div>
    );
};

export default TeddyLogo;
