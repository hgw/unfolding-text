require 'compass-normalize'

# Require any additional compass plugins here.
# :production || :development
environment = :development

# :nested || :expanded || :compact || :compressed
#output_style = (environment == :production) ? :compressed : :expanded


# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true

line_comments = (environment == :production) ? false : true


# add another dir scss > additional_import_paths || add_import_path
#additional_import_paths = ''

# other
# color_output = false
# asset_cache_buster :none

cache_dir = "./src/.cache/sass"
