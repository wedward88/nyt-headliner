export interface HeadlineType {
  headline: {
    main: string;
  };
  section_name: string;
  word_count: number;
  lead_paragraph: string;
  web_url: string;
  pub_date: string;
  multimedia: [{ url: string }];
}
