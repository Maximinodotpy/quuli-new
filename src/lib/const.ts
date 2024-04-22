export const AMOUNT_OF_ANSWERED_QUESTIONS_BEFORE_PROPOSALS = 10;
export const QUESTION_MIN_LENGTH = 10;
export const QUESTION_MAX_LENGTH = 90;
export const ANSWER_MAX_LENGTH = 40;

export const RECENT_QUESTIONS_COOKIE_KEY = "recent_questions_v1";

export const AMOUNT_OF_RANKED_USERS_SHOWN = 9;

export const DATE_FORMAT = "DD.MM.yyyy";
export const TIME_FORMAT = "HH:mm";
export const DATE_TIME_FORMAT = `${DATE_FORMAT} ${TIME_FORMAT}`;

interface Shortcut {
    key: string
    name: string
}

export const SHORTCUTS: { [key: string]: Shortcut } = {
    'skip_question': {
        key: 'Enter',
        name: 'Frage überspringen',
    },
    'select_first_answer': {
        key: '1',
        name: 'Erste Antwort auswählen',
    },
    'select_second_answer': {
        key: '2',
        name: 'Zweite Antwort auswählen',
    },
    'select_third_answer': {
        key: '3',
        name: 'Dritte Antwort auswählen',
    },
    'select_fourth_answer': {
        key: '4',
        name: 'Vierte Antwort auswählen',
    },
}


export const MINIMUM_AMOUNT_OF_QUESTIONS_FOR_CATEGORY = 5;