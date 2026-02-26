import { Command } from 'cmdk';
import { Command as CommandType } from './commands';

interface CommandItemProps {
  command: CommandType;
  onSelect: () => void;
}

export const CommandItem = ({ command, onSelect }: CommandItemProps) => {
  const Icon = command.icon;

  return (
    <Command.Item
      value={`${command.label} ${command.description} ${command.symbol || ''} ${command.chain || ''}`}
      onSelect={onSelect}
      className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-md mx-1
                 text-gray-300
                 data-[selected=true]:bg-[#00E5FF]/10
                 data-[selected=true]:text-white
                 hover:bg-[#00E5FF]/5
                 transition-colors duration-100"
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-md bg-[#252525] text-gray-400 data-[selected=true]:text-[#00E5FF]">
        <Icon size={16} className="group-data-[selected=true]:text-[#00E5FF]" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-medium">{command.label}</span>
          {command.chain && (
            <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-[#252525] text-gray-500 uppercase tracking-wider">
              {command.chain}
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500 truncate">{command.description}</p>
      </div>

      {command.shortcut && (
        <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-1 text-[10px] font-mono
                        rounded border border-[#333] bg-[#252525] text-gray-500">
          {command.shortcut}
        </kbd>
      )}
    </Command.Item>
  );
};
