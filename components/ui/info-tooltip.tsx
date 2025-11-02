import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';
import { HelpCircle, Info } from 'lucide-react';

interface InfoTooltipProps {
  content: string | React.ReactNode;
  children?: React.ReactNode;
  icon?: 'help' | 'info';
  side?: 'top' | 'right' | 'bottom' | 'left';
}

export function InfoTooltip({ content, children, icon = 'help', side = 'top' }: InfoTooltipProps) {
  const Icon = icon === 'help' ? HelpCircle : Info;

  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          {children || (
            <button
              type="button"
              className="inline-flex items-center justify-center text-gray-500 hover:text-gray-400 transition-colors"
            >
              <Icon className="w-4 h-4" />
            </button>
          )}
        </TooltipTrigger>
        <TooltipContent
          side={side}
          className="max-w-xs bg-slate-800 border-slate-700 text-gray-100"
        >
          <div className="text-sm">{content}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export const tradingTooltips = {
  lotSize: 'The volume/size of your trade. 0.01 = 1 micro lot, 0.1 = 1 mini lot, 1.0 = 1 standard lot',
  stopLoss: 'The price level where your trade will automatically close to limit losses',
  takeProfit: 'The price level where your trade will automatically close to secure profits',
  riskPercent: 'Percentage of your account balance you\'re willing to risk on this trade',
  leverage: 'Multiplier that allows you to control larger positions with less capital. Higher leverage = higher risk',
  spread: 'The difference between buy and sell price. Lower spread = better trading conditions',
  swap: 'Overnight interest charged/paid for holding positions beyond market close',
  margin: 'The amount of money required to open and maintain a leveraged position',
  equity: 'Your account balance plus/minus any open position profits/losses',
  freeMargin: 'The amount available for opening new positions',
  marginLevel: 'Equity divided by used margin (%). Below 100% may trigger margin call',
  drawdown: 'The peak-to-trough decline in your account balance',
  winRate: 'Percentage of trades that resulted in profit',
  profitFactor: 'Gross profit divided by gross loss. Above 1.0 means profitable strategy',
  sharpeRatio: 'Risk-adjusted return metric. Higher is better (> 1.0 is good)',
  riskRewardRatio: 'Ratio of potential profit to potential loss. Minimum 1:2 recommended',
  slippage: 'The difference between expected and actual execution price',
  requiredMargin: 'The amount needed to open this specific position',
  pipValue: 'The monetary value of a 1-pip movement in the currency pair',
};
