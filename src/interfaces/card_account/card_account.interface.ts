import { AccountType } from '../account/account.interface';
import { CardType } from '../cards/cards.interface';

type CardAccountType = {
    account: AccountType;
    card: CardType;
}

export {
    CardAccountType,
}