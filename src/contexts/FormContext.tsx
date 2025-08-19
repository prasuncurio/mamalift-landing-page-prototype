import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface EPDSResponse {
  questionId: number;
  score: number;
  answer: string;
}

export interface FormData {
  epdsResponses: EPDSResponse[];
  epdsScore: number;
  riskLevel: 'low' | 'moderate' | 'high' | 'crisis';
  programType: 'MamaLift' | 'MamaLift Plus' | 'ineligible';
  demographics: {
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    email?: string;
    phone?: string;
    zipCode?: string;
    sessionType?: 'video' | 'phone' | 'in-person' | 'no-preference';
    referralSource?: string;
    providerName?: string;
  };
  insurance: {
    provider?: string;
    memberId?: string;
    groupNumber?: string;
    selectedAppointment?: string;
    therapistId?: string;
    matchedDate?: string;
  };
}

interface FormContextType {
  formData: FormData;
  updateEPDSResponse: (response: EPDSResponse) => void;
  calculateEPDSScore: () => number;
  getRiskLevel: () => string;
  updateDemographics: (demographics: Partial<FormData['demographics']>) => void;
  updateInsurance: (insurance: Partial<FormData['insurance']>) => void;
  resetForm: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

const initialFormData: FormData = {
  epdsResponses: [],
  epdsScore: 0,
  riskLevel: 'low',
  programType: 'MamaLift',
  demographics: {},
  insurance: {},
};

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const updateEPDSResponse = (response: EPDSResponse) => {
    setFormData(prev => {
      const existingIndex = prev.epdsResponses.findIndex(r => r.questionId === response.questionId);
      const newResponses = existingIndex >= 0 
        ? prev.epdsResponses.map((r, i) => i === existingIndex ? response : r)
        : [...prev.epdsResponses, response];
      
      const totalScore = newResponses.reduce((sum, r) => sum + r.score, 0);
      
      let riskLevel: FormData['riskLevel'] = 'low';
      let programType: FormData['programType'] = 'MamaLift';
      
      // Check Q10 for crisis intervention
      const q10Response = newResponses.find(r => r.questionId === 10);
      if (q10Response && q10Response.score > 0) {
        riskLevel = 'crisis';
        programType = 'ineligible';
      } else if (totalScore >= 20) {
        riskLevel = 'high';
        programType = 'ineligible';
      } else if (totalScore >= 13) {
        riskLevel = 'moderate';
        programType = 'MamaLift Plus';
      } else {
        riskLevel = 'low';
        programType = 'MamaLift';
      }

      return {
        ...prev,
        epdsResponses: newResponses,
        epdsScore: totalScore,
        riskLevel,
        programType,
      };
    });
  };

  const calculateEPDSScore = () => {
    return formData.epdsResponses.reduce((sum, response) => sum + response.score, 0);
  };

  const getRiskLevel = () => {
    const score = calculateEPDSScore();
    const q10Response = formData.epdsResponses.find(r => r.questionId === 10);
    
    if (q10Response && q10Response.score > 0) return 'crisis';
    if (score >= 20) return 'high';
    if (score >= 13) return 'moderate';
    return 'low';
  };

  const updateDemographics = (demographics: Partial<FormData['demographics']>) => {
    setFormData(prev => ({
      ...prev,
      demographics: { ...prev.demographics, ...demographics }
    }));
  };

  const updateInsurance = (insurance: Partial<FormData['insurance']>) => {
    setFormData(prev => ({
      ...prev,
      insurance: { ...prev.insurance, ...insurance }
    }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  return (
    <FormContext.Provider value={{
      formData,
      updateEPDSResponse,
      calculateEPDSScore,
      getRiskLevel,
      updateDemographics,
      updateInsurance,
      resetForm,
    }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};