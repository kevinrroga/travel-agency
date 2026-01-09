import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "./ui/button";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "al" : "en");
  };

  return (
    <Button
      onClick={toggleLanguage}
      variant="ghost"
      size="sm"
      className="px-2 py-1 h-8 text-xs font-semibold"
      aria-label={`Switch to ${language === "en" ? "Albanian" : "English"}`}
    >
      {language === "en" ? "AL" : "EN"}
    </Button>
  );
};

export default LanguageSwitcher;
