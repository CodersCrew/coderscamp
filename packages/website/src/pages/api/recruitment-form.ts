import type { NextApiRequest, NextApiResponse } from 'next';

import type { RecruitmentModalData } from '@/components/RecruitmentModal';

async function sendRecruitmentForm(req: NextApiRequest, res: NextApiResponse) {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Environment not configured for sending recruitment forms');
    }

    const { createClient } = await import('@supabase/supabase-js');

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const values: RecruitmentModalData = req.body;

    const { error } = await supabase.from<RecruitmentModalData>('emails').insert(values);

    if (error) {
      throw new Error(error.message);
    }

    return res.status(200).json({ message: 'Recruitment form submitted' });
  } catch (ex) {
    return res.status(500).json({ message: 'Error when sending recruitment form' });
  }
}

// eslint-disable-next-line import/no-default-export
export default sendRecruitmentForm;
