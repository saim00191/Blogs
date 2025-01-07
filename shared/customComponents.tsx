const customComponents = {
  block: {
    normal: ({ children }: any) => {
      return (
        <p className="text-[#3B3C4A] text-[20px] leading-[32px] font-normal">
          {children}
        </p>
      );
    },

    h3: ({ children }: any) => {
      return (
        <h3 className="text-[28px] text-[#181A2A]  leading-[28px] font-bold pt-8 pb-3">
          {children}
        </h3>
      );
    },
  },
};
export default customComponents;
