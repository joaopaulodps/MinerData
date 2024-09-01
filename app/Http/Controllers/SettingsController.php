<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class SettingsController extends Controller
{
    // Exibe o formulário de configuração
    public function edit()
    {
        $siteName = config('site.name');
        $logoPath = config('site.logo', ''); // Pega o caminho do logo do config

        return inertia('Settings/Settings', [
            'siteName' => $siteName,
            'logoPath' => $logoPath,
        ]);
    }

    // Processa a atualização do nome do site e do logo
    public function update(Request $request)
{
    $request->validate([
        'siteName' => 'required|string|max:255',
        'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Valida o upload da imagem
    ]);

    // Atualiza o nome do site
    $siteName = $request->input('siteName');
    $this->setSiteName($siteName);

    // Processa o upload do logo se existir
    if ($request->hasFile('logo')) {
        $logo = $request->file('logo');
        $logoPath = $logo->store('photos', 'public');

        // Apaga o logo antigo, se existir
        $oldLogoPath = config('site.logo', '');
        if ($oldLogoPath && Storage::disk('public')->exists($oldLogoPath)) {
            Storage::disk('public')->delete($oldLogoPath);
        }

        // Atualiza o caminho do logo no arquivo de configuração
        $this->setSiteLogo($logoPath);
    }
    
    return redirect()->route('settings.edit')->with('success', 'Dados atualizados!');
}


protected function setSiteName($name)
{
    $configPath = config_path('site.php');

    // Lê o conteúdo do arquivo de configuração atual
    $configContent = File::get($configPath);

    // Busca a linha que define o nome do site e a substitui
    if (preg_match("/'name' => '.*',/", $configContent)) {
        $configContent = preg_replace("/'name' => '.*',/", "'name' => '" . addslashes($name) . "',", $configContent);
    } else {
        // Se a linha 'name' não existir, adiciona no final do arquivo antes de '];'
        $configContent = str_replace("];", "    'name' => '" . addslashes($name) . "',\n];", $configContent);
    }

    // Salva o arquivo de configuração atualizado
    File::put($configPath, $configContent);
}


    protected function setSiteLogo($logoPath)
    {
        $configPath = config_path('site.php');

        // Lê o arquivo de configuração atual
        $configContent = File::get($configPath);

        // Atualiza ou adiciona o caminho do logo
        if (strpos($configContent, "'logo'") !== false) {
            $configContent = preg_replace("/'logo' => '.*',/", "'logo' => '" . addslashes($logoPath) . "',", $configContent);
        } else {
            $configContent = str_replace("];", "    'logo' => '" . addslashes($logoPath) . "',\n];", $configContent);
        }

        // Salva o arquivo de configuração atualizado
        File::put($configPath, $configContent);
    }
}
